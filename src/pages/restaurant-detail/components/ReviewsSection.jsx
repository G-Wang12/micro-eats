import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ReviewsSection = ({ reviews, ratingBreakdown, averageRating, totalReviews }) => {
  const [sortBy, setSortBy] = useState('recent');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const navigate = useNavigate();

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'highest', label: 'Highest Rated' },
    { value: 'lowest', label: 'Lowest Rated' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      case 'recent':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingPercentage = (rating) => {
    return Math.round((ratingBreakdown[rating] / totalReviews) * 100);
  };

  const handleWriteReview = () => {
    navigate('/write-review');
  };

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="bg-surface rounded-lg border border-border-light p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-text-primary">{averageRating}</span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={20}
                    className={star <= Math.round(averageRating) ? 'text-accent' : 'text-border-dark'}
                    fill={star <= Math.round(averageRating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </div>
            <p className="text-text-secondary">
              Based on {totalReviews} reviews
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm text-text-secondary w-8">{rating} ★</span>
                <div className="flex-1 bg-background rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getRatingPercentage(rating)}%` }}
                  />
                </div>
                <span className="text-sm text-text-secondary w-12 text-right">
                  {getRatingPercentage(rating)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        <div className="mt-6 pt-6 border-t border-border-light">
          <button
            onClick={handleWriteReview}
            className="w-full md:w-auto bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Icon name="PenTool" size={18} />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">
          Reviews ({totalReviews})
        </h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort-reviews" className="text-sm text-text-secondary">
            Sort by:
          </label>
          <select
            id="sort-reviews"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="bg-surface rounded-lg border border-border-light p-6">
            {/* Review Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-text-primary">{review.userName}</h4>
                  <span className="text-sm text-text-secondary">{formatDate(review.date)}</span>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      name="Star"
                      size={16}
                      className={star <= review.rating ? 'text-accent' : 'text-border-dark'}
                      fill={star <= review.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <p className="text-text-secondary leading-relaxed">{review.text}</p>
            </div>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="mb-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {review.images.map((image, index) => (
                    <div key={index} className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border-light">
              <button className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors duration-200">
                <Icon name="ThumbsUp" size={16} />
                <span className="text-sm">Helpful ({review.helpful})</span>
              </button>
              <button className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors duration-200">
                <Icon name="Flag" size={16} />
                <span className="text-sm">Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 3 && (
        <div className="text-center">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="bg-surface text-text-primary px-6 py-3 rounded-lg font-medium border border-border hover:bg-surface-hover transition-colors duration-200"
          >
            {showAllReviews ? 'Show Less Reviews' : `Show All ${reviews.length} Reviews`}
          </button>
        </div>
      )}

      {/* No Reviews State */}
      {reviews.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MessageSquare" size={32} className="text-text-tertiary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Reviews Yet</h3>
          <p className="text-text-secondary mb-6">
            Be the first to share your experience at this restaurant!
          </p>
          <button
            onClick={handleWriteReview}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
          >
            Write the First Review
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;