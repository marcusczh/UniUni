import styles from "./MyProfile.module.css";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import Avatar from "./avatarphoto.png";
import { useNavigate } from "react-router-dom";

function UserProfile({ userDetails }) {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.userProfile}>
        <img className={styles.profilePicture} src={Avatar} alt="avatar" />
        <div className={styles.username}>
          {user.username} ({userDetails.score})
        </div>
        <div className={styles.userBio}>
          {userDetails ? userDetails.bio : "Not found"}
        </div>
        <button
          className={styles.editProfile}
          onClick={(e) => navigate("/EditProfile")}
        >
          Edit Profile
        </button>
      </div>
    </>
  );
}

export default UserProfile;
