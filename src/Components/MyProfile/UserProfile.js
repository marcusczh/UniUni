import styles from "./MyProfile.module.css";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
//import Avatar from "./avatarphoto.png";
import { useNavigate } from "react-router-dom";

function UserProfile({ userDetails }) {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.userProfile}>
        <img
          className={styles.profilePicture}
          src={
            userDetails.profilePicture !== ""
              ? userDetails.profilePicture
              : "https://res.cloudinary.com/dv1ej3tz8/image/upload/v1657183216/avatarphoto_mucrnr.png"
          }
          alt="None specified"
        />

        <div className={styles.username}>{user.username}</div>
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
