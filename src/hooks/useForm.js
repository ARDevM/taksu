// src/hooks/useForm.js
import { useState } from "react";
import { toast } from "react-hot-toast";

/**
 * useForm
 * - initial: initial form object
 * - returns form, setField, setForm, loading, errors, generalError, submit(fn)
 *
 * submit(fn) expects a function that receives the current form and returns a promise (usually an axios request).
 * submit will handle try/catch, set loading, set errors, and show toast for errors.
 */
export default function useForm(initial = {}) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const setField = (field, value) =>
    setForm((p) => ({ ...p, [field]: value }));

  const reset = () => {
    setForm(initial);
    setErrors({});
    setGeneralError("");
    setLoading(false);
  };

  const submit = async (fn) => {
    setLoading(true);
    setErrors({});
    setGeneralError("");
    try {
      const res = await fn(form);
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);

      // If server responded
      if (err?.response) {
        const status = err.response.status;

        // Laravel validation errors (422) -> errors object
        if (status === 422 && err.response.data?.errors) {
          setErrors(err.response.data.errors);
          toast.error("Periksa kembali input form.");
        } else {
          // show server message if present
          const msg =
            err.response.data?.message ||
            "Terjadi kesalahan pada server. Coba lagi nanti.";
          setGeneralError(msg);
          toast.error(msg);
        }
      } else {
        // Network / no-response
        setGeneralError("Gagal terhubung ke server. Periksa koneksi Anda.");
        toast.error("Gagal terhubung ke server.");
      }

      // rethrow so caller can still handle if needed
      throw err;
    }
  };

  return {
    form,
    setForm,
    setField,
    reset,
    loading,
    setLoading,
    errors,
    setErrors,
    generalError,
    setGeneralError,
    submit,
  };
}
