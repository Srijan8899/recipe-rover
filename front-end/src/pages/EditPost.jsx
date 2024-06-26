import React, { useContext, useEffect, useState } from "react";
import { FileInput, Label } from "flowbite-react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_SERVER_URL;

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);

  const userInfo = localStorage.getItem("token")
    ? {
        userId: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
      }
    : null;

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("image", image);
      data.append("summary", summary);
      data.append("ingredients", ingredients);
      data.append("instructions", instructions);
      const response = await fetch(`${apiURL}/recipe/update/${id}`, {
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      if (response.ok) {
        response.json(data);
        navigate("/user/viewrecipe");
        toast.success("Recipe updated successfully");
      } else {
        console.error("Error while posting recipe");
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error("Error during fetch operation:", error);
    }
  };

  useEffect(() => {
    const previousData = async () => {
      const response = await fetch(`${apiURL}/recipe/get/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setTitle(data.title);
      setSummary(data.summary);
      setIngredients(data.ingredients);
      setInstructions(data.instructions);
    };
    previousData();
  }, []);

  return (
    <div className="w-full flex flex-col bg-gradient-to-br from-slate-500 to-slate-900 text-[#F8FAE5]">
      <div className="relative my-32 mx-auto w-[80vw] bg-transparent rounded-2xl backdrop-brightness-75 backdrop-blur-sm shadow-2xl md:p-0 p-6">
        <div className="pt-20 max-w-3xl mx-auto ">
          <h1 className="text-center text-3xl my-5 font-semibold">
            Update your Recipe
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
              <input
                type="title"
                placeholder="Recipe Name"
                required
                id="title"
                className="border border-gray-300 p-2 bg-transparent rounded-md w-full font-bold"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
              <textarea
                type="summary"
                rows={4}
                placeholder="Summary About Your Recipe. Details like nutrition, cooking time, etc."
                required
                id="summary"
                className="border border-gray-300 bg-transparent p-2 rounded-md w-full"
                value={summary}
                onChange={(ev) => setSummary(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row items-center justify-between bg-transparent text-white border-gray-300 p-3">
              <FileInput
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={(ev) => setImage(ev.target.files[0])}
              />
              <Label>
                While Updation you don't have to neccesarily upload image
              </Label>
            </div>
            <h2 className="md:mt-10 mt-3 text-[16px] md:text-[20px]">
              {" "}
              Enter Ingredients line by line(Use Enter after every ingredient
              for easy understanding).
            </h2>
            <ReactQuill
              theme="snow"
              placeholder="Write something..."
              className="h-44 mb-12"
              required
              value={ingredients}
              onChange={(newValue) => setIngredients(newValue)}
              //onChange={ev=>setContent((prev)=>({...prev, content:ev}))}
              //   onChange={(value) => {
              //     setFormData({ ...formData, content: value });
              //   }}
            />
            <h2 className="md:mt-8 mt-12 text-[16px] md:text-[20px]">
              {" "}
              Enter Instructions line by line(Use Enter after every instruction
              for easy understanding).
            </h2>
            <ReactQuill
              theme="snow"
              placeholder="Write something..."
              className="h-44 mb-12"
              required
              value={instructions}
              onChange={(newValue) => setInstructions(newValue)}
              //onChange={ev=>setContent((prev)=>({...prev, content:ev}))}
              //   onChange={(value) => {
              //     setFormData({ ...formData, content: value });
              //   }}
            />

            <button
              type="submit"
              className="border bg-gradient-to-r from-teal-200 to-lime-300 hover:bg-gradient-to-l text-black mt-16 md:mt-0 mb-10 p-3 rounded-md"
            >
              Update
            </button>
          </form>
        </div>
        <style>
          {`
          .ql-toolbar .ql-active,
          .ql-toolbar button button:hover {
            background-color: white !important;
          }
          .ql-toolbar .ql-fill, .ql-toolbar .ql-stroke {
            stroke: white;
          }
          .ql-picker .ql-picker-label {
            stroke: white;
            fill: white;
            color: white;
          }
        `}
        </style>
      </div>
    </div>
  );
}

export default EditPost;
