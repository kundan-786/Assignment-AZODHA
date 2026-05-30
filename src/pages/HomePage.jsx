import { useSelector } from 'react-redux';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { resetOnboarding } from '../store/onboardingSlice';

export default function HomePage() {
  const username = useSelector((state) => state.auth.username);
  const profile = useSelector((state) => state.onboarding.personalProfile);
  const songs = useSelector((state) => state.onboarding.favoriteSongs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetOnboarding());
    navigate('/login');
  };

  return (
    <div className="page home-page">
      <div className="card home-card">
        {profile.profilePicture && (
          <img
            src={profile.profilePicture}
            alt="Profile"
            className="home-avatar"
          />
        )}
        <h1 className="page-title">Welcome, {profile.name || username}!</h1>
        <p className="page-subtitle">
          You have completed onboarding. Here is a summary of your profile.
        </p>

        <div className="summary">
          <div className="summary-item">
            <span className="summary-label">Email</span>
            <span className="summary-value">{profile.email}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Age</span>
            <span className="summary-value">{profile.age}</span>
          </div>
          {songs.filter((s) => s.trim()).length > 0 && (
            <div className="summary-item">
              <span className="summary-label">Favorite Songs</span>
              <ul className="summary-list">
                {songs
                  .filter((s) => s.trim())
                  .map((song, i) => (
                    <li key={i}>{song}</li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        <Button type="button" variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
