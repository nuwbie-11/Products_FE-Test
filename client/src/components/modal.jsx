import React, { useState } from 'react';

function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [brandOptions, setOptions] = useState([])

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <>
    <p className='hover:cursor-pointer hover:text-blue-500' onClick={handleOpenModal}>Add Product</p>
    <div className={`fixed z-50  inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className=" relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          {/* {children} */}
          <div className="form-wrapper h-[30rem] pt-12">
          <form className='flex flex-col items-center gap-y-2' onSubmit={()=>alert("P")}>
                <label htmlFor="namaBarang">Nama Barang</label>
                <input type="text" name="namaBarang" id="namaBarang" className='border border-sky-500 rounded w-4/5 mb-3' required/>

                <label htmlFor="brand">Brand</label>
                <input type="text" name="brand" id="brand" className='border border-sky-500 rounded w-4/5 mb-3' required/>

                <label htmlFor="brand">Brand</label>
                <input type="text" name="brand" id="brand" className='border border-sky-500 rounded w-4/5 mb-3' required/>

                <input type="submit" value="Tambah" className={`px-8 py-2 rounded ${"bg-sky-500 text-zinc-50  transition-all duration-150 hover:border hover:border-sky-500 hover:bg-transparent hover:text-sky-500 cursor-pointer" } `} 
                />
              </form>
          </div>
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Modal;