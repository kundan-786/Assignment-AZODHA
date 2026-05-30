import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
  setCurrentStep,
  updateFavoriteSongs,
} from '../store/onboardingSlice';
import Button from '../components/Button';

export default function FavoriteSongsStep() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedSongs = useSelector((state) => state.onboarding.favoriteSongs);

  useEffect(() => {
    dispatch(setCurrentStep(2));
  }, [dispatch]);

  const initialSongs =
    savedSongs.length > 0 ? savedSongs : [''];

  const handleBack = () => {
    dispatch(setCurrentStep(1));
    navigate('/onboarding/step/1');
  };

  return (
    <div className="step-content">
      <h2 className="step-title">Favorite Songs</h2>
      <p className="step-description">Add your favorite songs to the list</p>

      <Formik
        initialValues={{ songs: initialSongs }}
        enableReinitialize
        onSubmit={(values) => {
          const filtered = values.songs.filter((s) => s.trim() !== '');
          dispatch(updateFavoriteSongs(filtered.length > 0 ? filtered : ['']));
          dispatch(setCurrentStep(3));
          navigate('/onboarding/step/3');
        }}
      >
        {({ values }) => (
          <Form className="form">
            <FieldArray name="songs">
              {({ push, remove }) => (
                <div className="songs-list">
                  {values.songs.map((_, index) => (
                    <div key={index} className="song-row">
                      <Field
                        name={`songs.${index}`}
                        placeholder={`Song ${index + 1}`}
                        className="song-input"
                      />
                      {values.songs.length > 1 && (
                        <button
                          type="button"
                          className="btn-remove"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => push('')}
                  >
                    Add Song
                  </Button>
                </div>
              )}
            </FieldArray>

            <div className="form-actions">
              <Button type="button" variant="secondary" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" variant="primary">
                Next
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
