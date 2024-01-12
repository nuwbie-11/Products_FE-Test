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
  const [brandsOption, setBrandsOption] = useFetch("http://127.0.0.1:5000/getDistinctBrand");
  const [uid] = useIsLoggedIn("http://127.0.0.1:5000/protected");
  const [isLoading,setLoading] = useState(true)

  const [newBrandOption, setNewBrandOption] = useState("");
  const [brandController, setBrandController] = useState();

useEffect(() => {
  if ((uid !== undefined)  && (brandsOption !== undefined) ) {
      setLoading(false)
    }

  }, [uid]);
  
  useEffect(()=>{
    if ((!isLoading) && (!uid.hasOwnProperty("uid")) ) {
      navigate("/")
    }
  },[isLoading])

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
        <>
          <h3 className="font-bold text-[2rem]">Tambah Barang</h3>
          <div className="addProductFormWrapper">
            <form
              className="flex flex-col items-start gap-y-2"
              onSubmit={handleSubmit}
            >
              <MyTextField name="namaBarang" title="Nama Barang" />

              <div className="dropdownWrapper border-b-2 border-sky-300 flex justify-between gap-x-3 pb-1 w-3/5 mb-3">
                <label htmlFor="brand">Brand:</label>

                <select
                  name="brand"
                  className="border-0 w-3/5"
                  onChange={handleBrandChanges}
                >
                  {brandsOption.map((item, ix) => (
                    <option value={item} key={ix}>
                      {item}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newBrandOption}
                  onChange={(e) => setNewBrandOption(e.target.value)}
                />

                <button
                  className="hover:text-blue-500"
                  onClick={() => handleNewBrandOption()}
                >
                  Tambahkan Brand
                </button>
              </div>

              <div className="bg-white h-[8rem] w-3/5 mb-3">
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
        </>
      )}
    </>
  );
}

export default AddProducts;
