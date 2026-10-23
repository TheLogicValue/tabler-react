import * as React from "react";

export type ProfileImageProps = {
  readonly avatarURL: string;
};

function ProfileImage({ avatarURL }: ProfileImageProps): React.ReactElement {
  return <img className="card-profile-img" alt="Profile" src={avatarURL} />;
}

export default ProfileImage;
