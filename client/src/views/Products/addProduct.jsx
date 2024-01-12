import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingCircular from "../../components/loader";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import MyTextField from "../../components/textField";

function AddProducts() {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [isLoading, setLoading] = useState(true);

  const [brandsOption, setBrandsOption] = useState([]);
  const [newBrandOption, setNewBrandOption] = useState("");
  const [brandController, setBrandController] = useState();

  useEffect(() => {
    const isLoggedIn = async () => {
      const res = await fetch("/protected", {
        credentials: "include",
      });
      if (!res.ok) {
        navigate("/");
      }
      setLoading(false);
    };


    

    const getBrands = async () => {
      fetch("/getDistinctBrand")
        .then((res) => res.json())
        .then((value) => setBrandsOption(value["response"]));
    };


    getBrands();
    isLoggedIn();
  }, []);


  const handleBrandChanges = (event) => {
    setBrandController(event.target.value);
  };

  const handleNewBrandOption = () => {
    if (newBrandOption !== "") {
        setBrandsOption([...brandsOption,newBrandOption]);
        setNewBrandOption("")
        
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingCircular></LoadingCircular>
      ) : (
        <div className="pl-[16rem] pt-12 min-h-screen flex flex-col gap-y-5">
          <h3 className="font-bold text-[2rem]">Tambah Barang</h3>
          <div className="addProductFormWrapper">
            <form
              className="flex flex-col items-start gap-y-2"
              onSubmit={() => alert(editorState)}
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
                    <option value={ix} key={ix}>
                      {item}
                    </option>
                  ))}
                </select>
                <input
                required
                  type="text"
                  value={newBrandOption}
                  onChange={(e) => setNewBrandOption(e.target.value)}
                />

                <button className="hover:text-blue-500" onClick={() => handleNewBrandOption()}>Tambahkan Brand</button>
              </div>

              <div className="bg-white h-[8rem] w-3/5 mb-3">
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                />
              </div>
              <MyTextField name="namaVariasi" title="Variasi" />
              <MyTextField name="harga" title="Harga" type="number" />

              <input
                type="submit"
                value="Tambah"
                className={`px-8 py-2 rounded ${"bg-sky-500 text-zinc-50  transition-all duration-150 hover:border hover:border-sky-500 hover:bg-transparent hover:text-sky-500 cursor-pointer"} `}
              />
            </form>
            {/* <button
              onClick={() =>
                console.log(editorState.getCurrentContent().getPlainText())
              }
            >
              {" "}
              Press Me{" "}
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}

export default AddProducts;
