import {ChangeEvent, useState, FormEvent, useRef} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addComment} from '../../store/api-actions';
import { RequestStatus } from '../../const';
import { toast } from 'react-toastify';
import Spinner from '../spinner/spinner';

type ReviewFormProps = {
  id: string | undefined;
}

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;
const Rating = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

export default function ReviewForm ({id} : ReviewFormProps) {
  const dispatch = useAppDispatch();
  const [commentData, setComment] = useState('');
  const [ratingData, setRating] = useState(0);
  const isValid =
    commentData.length >= MIN_COMMENT_LENGTH &&
    commentData.length <= MAX_COMMENT_LENGTH &&
    ratingData;
  const commentLoadStatus = useAppSelector((state) => state.offers.isCommentLoading);
  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };
  const formRef = useRef<HTMLFormElement>(null);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleFormSumbit = (evt : FormEvent) => {
    evt.preventDefault();
    const userComment = {
      offerId: id,
      comment: commentData,
      rating: ratingData,
    };
    dispatch(addComment(userComment)).then(() => {
      if (commentLoadStatus === RequestStatus.Pending) {
        return <Spinner />;
      }
      if (commentLoadStatus === RequestStatus.Fulfilled) {
        setComment('');
        setRating(0);
        if (formRef.current) {
          formRef.current.reset();
        }
      }
      if (commentLoadStatus === RequestStatus.Rejected) {
        toast.error('Failed to send a review, please, try again');
      }
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSumbit} ref={formRef}>
      <label className="reviews__label form__label" htmlFor="review">
  Your review
      </label>
      <div className="reviews__rating-form form__rating" key={'reviews__rating'}>
        {Object.entries(Rating).reverse().map(([key, value] : string[]) => (
          <div key = {key}>
            <input
              key={`${key}Input`}
              onChange={handleRatingChange}
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={key}
              id={`${key}-stars`}
              type="radio"
              disabled={commentLoadStatus === RequestStatus.Pending }
            />
            <label
              key={`${key}Label`}
              htmlFor={`${key}-stars`}
              className="reviews__rating-label form__rating-label"
              title={value}
            >
              <svg className="form__star-image" width={37} height={33} key={`${key}-icon`}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </div>
        ))}
      </div>
      <textarea
        onChange={handleTextareaChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={commentData}
        disabled={commentLoadStatus === RequestStatus.Pending}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
    To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
    your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || commentLoadStatus === RequestStatus.Pending}
        >
    Submit
        </button>
      </div>
    </form>
  );
}
