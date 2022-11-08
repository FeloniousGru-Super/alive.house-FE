/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { setErrorMessage, useErrors } from "../hooks/useErrors";
import { useHookstate } from "@hookstate/core";

export default function ErrorModal() {
  const [open, setOpen] = useState(false);
  const [errTitle, setErrTitle] = useState("");
  const [errMesg, setErrMesg] = useState("");
  const errorState = useHookstate(useErrors());

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (!errorState.errorTitle.value) {
      dismiss();
      return;
    }
    setOpen(errorState.errorTitle.value !== "hidden");
    setErrMesg(errorState.errorMsg.value);
    setErrTitle(errorState.errorTitle.value || "");
  }, [errorState.errorTimeStamp?.value]);

  const dismiss = () => {
    setOpen(false);
    setErrorMessage({ title: "", message: "" });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={dismiss}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-10 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full sm:h-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-5 mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon
                      className="h-10 w-10 text-red"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-3xl leading-6 font-medium text-gray"
                    >
                      {errTitle}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p
                        className="text-2xl text-gray"
                        style={{ fontFamily: "Nuform Sans" }}
                      >
                        {errMesg}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  {/* <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button> */}
                  {/* <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md   shadow-sm px-4 py-2 bg-white text-base font-medium text-gray hover:bg-gray hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => dismiss()}
                    ref={cancelButtonRef}
                  >
                    Ok
                  </button> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
