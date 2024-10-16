import React, { useEffect, useState } from "react";
import Uploder from "../../Components/Uploder";
import { Input } from "../../Components/UsedInputs";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../../Components/Notfications/Error";
import ImagePreview from "../../Components/ImagePreview";
import toast from "react-hot-toast";
import { ProfileValidation } from "../../Components/Validation/UserValidation";
import {
  deleteProfileAction,
  updateProfileAction,
} from "../../Redux/Actions/UserActions";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.userDeleteProfile
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });
  // update user profile
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: imageUrl }));
  };

  // delete Profile
  const deleteProfile = () => {
    window.confirm("Are you sure you want to delete your profile?") &&
      dispatch(deleteProfileAction());
  };

  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo.fullName);
      setValue("email", userInfo.email);
    }

    if (isSuccess) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
    if (isError || deleteError) {
      toast.error(isError || deleteError);
    }
  }, [setValue, userInfo, isSuccess, deleteError, dispatch, navigate, isError]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploder setImageUrl={setImageUrl} />
          </div>
          <div className="col-span-2 ">
            <ImagePreview
              image={imageUrl}
              name={userInfo ? userInfo?.fullName : "User"}
            />
          </div>
        </div>
        <div className="w-full">
          <Input
            label="Full Name"
            placeholder="Netflixo React Tailwind"
            type="text"
            bg={true}
            name="fullName"
            register={{ ...register("fullName") }}
          />
          {errors.fullName && <InlineError message={errors.fullName.message} />}
        </div>
        <div className="w-full">
          <Input
            label="Email"
            placeholder="netflixo@gmail.com"
            type="email"
            bg={true}
            name="email"
            register={{ ...register("email") }}
          />
          {errors.email && <InlineError message={errors.email.message} />}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            disabled={deleteLoading || isLoading}
            onClick={deleteProfile}
            className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {deleteLoading ? "Deleting..." : "Delete Profile"}
          </button>
          <button
            disabled={isLoading || deleteLoading}
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Profile;
