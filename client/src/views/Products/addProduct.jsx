import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingCircular from "../../components/loader";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import MyTextField from "../../components/textField";
import useFetch from "../../hooks/useFetch";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

function AddProducts() {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [brandsOption, setBrandsOption] = useFetch("/getDistinctBrand");
  const [uid] = useIsLoggedIn("/protected");
  const [isLoading, setLoading] = useState(true);

  const [newBrandOption, setNewBrandOption] = useState("");
  const [brandController, setBrandController] = useState();

  useEffect(() => {
    if (uid !== undefined && brandsOption !== undefined) {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    if (!isLoading && !uid.hasOwnProperty("uid")) {
      navigate("/");
    }
  }, [isLoading]);

  const handleBrandChanges = (event) => {
    setBrandController(event.target.value);
  };

  const handleNewBrandOption = () => {
    if (newBrandOption !== "") {
      setBrandsOption([...brandsOption, newBrandOption]);
      setNewBrandOption("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const dataStream = {
      namaBarang: formData.get("namaBarang"),
      namaVariasi: formData.get("namaVariasi"),
      brand: brandController,
      deskripsi: editorState.getCurrentContent().getPlainText(),
      hargaVariasi: formData.get("hargaVariasi"),
    };

    const res = await fetch("/createProductRecord", {
      method: "POST",
      body: JSON.stringify(dataStream),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingCircular></LoadingCircular>
      ) : (
        <div className="mb-12 md:mb-1">
          <h3 className="font-bold text-[2rem]">Tambah Barang</h3>
          <div className="addProductFormWrapper md:w-full">
            <form
              className="flex flex-col items-start gap-y-2"
              onSubmit={handleSubmit}
            >
              <MyTextField name="namaBarang" title="Nama Barang" />

              <div className="dropdownWrapper border-b-2 w-full md:w-4/5 border-sky-300 flex lg:flex-row flex-col items-start gap-y-3 md:gap-x-3 pb-1 mb-3">
                <div className="options flex gap-x-3 w-full">
                  <label htmlFor="brand">Brand:</label>
                  <select
                    name="brand"
                    className="border-0 md:w-4/5 w-full"
                    onChange={handleBrandChanges}
                  >
                    {brandsOption.map((item, ix) => (
                      <option value={item} key={ix}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="addOption flex flex-row-reverse lg:flex-row justify-end gap-x-3 w-full">
                  <input
                    type="text"
                    value={newBrandOption}
                    onChange={(e) => setNewBrandOption(e.target.value)}
                  />
                  <button
                    className="hover:text-blue-500 flex"
                    onClick={() => handleNewBrandOption()}
                  >
                    Tambahkan Brand<span className="lg:hidden block">:</span>
                  </button>
                </div>
              </div>

              <div className="bg-white h-[25rem] md:h-[15rem] mb-3">
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                />
              </div>
              <MyTextField name="namaVariasi" title="Variasi" />
              <MyTextField name="hargaVariasi" title="Harga" type="number" />

              <input
                type="submit"
                value="Tambah"
                className={`px-8 py-2 rounded ${"bg-sky-500 text-zinc-50  transition-all duration-150 hover:border hover:border-sky-500 hover:bg-transparent hover:text-sky-500 cursor-pointer"} `}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddProducts;
