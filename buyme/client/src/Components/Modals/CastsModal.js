import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import Uploder from "../Uploder";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InlineError } from "../Notfications/Error";
import ImagePreview from "../ImagePreview";
import { addCasts, updateCast } from "../../Redux/Actions/MoviesActions";
import toast from "react-hot-toast";

function CastsModal({ modalOpen, setModalOpen, cast }) {
  const generateId = Math.floor(Math.random() * 100000000);
  const [castImage, setCastImage] = useState("");
  const image = castImage ? castImage : cast?.image;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Please enter a cast name"),
      })
    ),
  });

  const onSubmit = (data) => {
    if (cast) {
      // update cast dispatch action
      dispatch(updateCast({ image: image, ...data, id: cast.id }));
      toast.success("Cast updated successfully");
    } else {
      // add cast dispatch action
      dispatch(addCasts({ id: generateId, image: castImage, ...data }));
      toast.success("Cast added successfully");
    }
    setModalOpen(false);
    reset();
    setCastImage("");
  };

  useEffect(() => {
    if (cast) {
      setValue("name", cast?.name);
    }
  }, [cast, setValue]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">
          {cast ? "Update Cast" : "Create Cast"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <div className="w-full">
            <Input
              label="Cast Name"
              placeholder={"John Doe"}
              type="text"
              bg={true}
              name="name"
              register={{ ...register("name") }}
            />
            {errors.name && <InlineError message={errors.name.message} />}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Cast Image</p>

            <Uploder setImageUrl={setCastImage} />
            <ImagePreview
              image={
                cast
                  ? castImage
                    ? castImage
                    : cast?.image
                  : castImage
                  ? castImage
                  : "/images/user.png"
              }
              name={"castImage"}
            />
          </div>
          <button className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white">
            {cast ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default CastsModal;
