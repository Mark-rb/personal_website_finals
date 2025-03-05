import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Feedback.css';
import { supabase } from '../supabaseClient';

const Feedback = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch existing comments
    fetchComments();

    // Set up real-time subscription
    const subscription = supabase
      .channel('feedback')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'feedback' 
        }, 
        payload => {
          if (payload.eventType === 'INSERT') {
            setComments(current => [...current, payload.new]);
          }
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      setComments(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch comments');
      console.error('Supabase Error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Log the attempt
      console.log('Attempting to insert feedback:', {
        name: newComment.name,
        email: newComment.email,
        message: newComment.message
      });

      const { error } = await supabase
        .from('feedback')
        .insert({
          name: newComment.name,
          email: newComment.email,
          message: newComment.message
        });

      if (error) {
        throw error;
      }

      // Clear the form on success
      setNewComment({
        name: '',
        email: '',
        message: ''
      });
      
      // Fetch the updated comments
      fetchComments();
      
    } catch (err) {
      setError(err.message || 'Failed to post comment');
      console.error('Supabase Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="feedback-container">
      <motion.h1 
        className="page-title"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Feedback
      </motion.h1>

      <div className="feedback-content">
        <motion.div 
          className="feedback-form-container"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Leave a Comment</h2>
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newComment.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newComment.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={newComment.message}
                onChange={handleChange}
                required
                rows="5"
                disabled={isSubmitting}
              />
            </div>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </motion.div>

        <motion.div 
          className="comments-container"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2>Comments</h2>
          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map(comment => (
                <motion.div
                  key={comment.id}
                  className="comment-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="comment-header">
                    <h3>{comment.name}</h3>
                    <span className="timestamp">
                      {new Date(comment.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="comment-message">{comment.message}</p>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;
