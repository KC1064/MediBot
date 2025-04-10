import { useState } from "react";
import { AlertCircle, Check, Plus, X } from "lucide-react";

export default function OnboardingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    height: "",
    weight: "",
    age: "",
    gender: "",
    history: [],
  });

  const [historyInput, setHistoryInput] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const addMedicalHistory = () => {
    if (historyInput.trim()) {
      setFormData({
        ...formData,
        history: [...formData.history, historyInput.trim()],
      });
      setHistoryInput("");

      // Clear error if it exists
      if (errors.history) {
        setErrors({
          ...errors,
          history: "",
        });
      }
    }
  };

  const removeMedicalHistory = (index) => {
    const updatedHistory = formData.history.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      history: updatedHistory,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.height) {
      newErrors.height = "Height is required";
    } else if (isNaN(formData.height) || Number(formData.height) <= 0) {
      newErrors.height = "Height must be a positive number";
    }

    if (!formData.weight) {
      newErrors.weight = "Weight is required";
    } else if (isNaN(formData.weight) || Number(formData.weight) <= 0) {
      newErrors.weight = "Weight must be a positive number";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
      newErrors.age = "Age must be a positive number";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    if (formData.history.length === 0) {
      newErrors.history = "Please add at least one medical history item";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitting(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Format data for submission
        const submissionData = {
          ...formData,
          height: Number(formData.height),
          weight: Number(formData.weight),
          age: Number(formData.age),
        };

        console.log("Form submitted:", submissionData);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      height: "",
      weight: "",
      age: "",
      gender: "",
      history: [],
    });
    setHistoryInput("");
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 border-b pb-4">
        Patient Onboarding
      </h2>

      {isSubmitted ? (
        <div className="text-center">
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center justify-center">
            <Check className="mr-2" size={20} />
            <span>Form submitted successfully!</span>
          </div>

          <div className="mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-4 text-gray-700">
              Submitted Information
            </h3>

            <div className="space-y-2 text-left">
              <div className="grid grid-cols-3">
                <span className="font-medium col-span-1 text-gray-600">
                  Name:
                </span>
                <span className="col-span-2">{formData.fullName}</span>
              </div>

              <div className="grid grid-cols-3">
                <span className="font-medium col-span-1 text-gray-600">
                  Height:
                </span>
                <span className="col-span-2">{formData.height} cm</span>
              </div>

              <div className="grid grid-cols-3">
                <span className="font-medium col-span-1 text-gray-600">
                  Weight:
                </span>
                <span className="col-span-2">{formData.weight} kg</span>
              </div>

              <div className="grid grid-cols-3">
                <span className="font-medium col-span-1 text-gray-600">
                  Age:
                </span>
                <span className="col-span-2">{formData.age}</span>
              </div>

              <div className="grid grid-cols-3">
                <span className="font-medium col-span-1 text-gray-600">
                  Gender:
                </span>
                <span className="col-span-2">{formData.gender}</span>
              </div>

              <div className="mt-2">
                <span className="font-medium text-gray-600 block mb-1">
                  Medical History:
                </span>
                <ul className="list-disc pl-8 mt-1 bg-white p-3 rounded-md border border-gray-100">
                  {formData.history.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
          >
            Submit Another Form
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="fullName"
            >
              Full Name*
            </label>
            <div className="relative">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.fullName
                    ? "border-red-500 pr-10 bg-red-50"
                    : formData.fullName
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="height"
              >
                Height (cm)*
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    errors.height
                      ? "border-red-500 pr-10 bg-red-50"
                      : formData.height
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  placeholder="Height in cm"
                  min="1"
                />
                {errors.height && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.height && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.height}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="weight"
              >
                Weight (kg)*
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    errors.weight
                      ? "border-red-500 pr-10 bg-red-50"
                      : formData.weight
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  placeholder="Weight in kg"
                  min="1"
                />
                {errors.weight && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.weight && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.weight}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="age"
              >
                Age*
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    errors.age
                      ? "border-red-500 pr-10 bg-red-50"
                      : formData.age
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  placeholder="Your age"
                  min="1"
                />
                {errors.age && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.age && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.age}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="gender"
              >
                Gender*
              </label>
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg appearance-none ${
                    errors.gender
                      ? "border-red-500 bg-red-50"
                      : formData.gender
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer Not to Say">Prefer Not to Say</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {errors.gender ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.gender}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Medical History*
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={historyInput}
                onChange={(e) => setHistoryInput(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add medical condition"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addMedicalHistory();
                  }
                }}
              />
              <button
                type="button"
                onClick={addMedicalHistory}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus size={18} className="mr-1" /> Add
              </button>
            </div>

            <div
              className={`border rounded-lg ${
                errors.history ? "border-red-500" : "border-gray-200"
              }`}
            >
              {formData.history.length > 0 ? (
                <ul
                  className={`p-3 rounded-lg max-h-40 overflow-y-auto ${
                    errors.history ? "bg-red-50" : "bg-gray-50"
                  }`}
                >
                  {formData.history.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-2 px-3 mb-1 bg-white rounded-md border border-gray-100 shadow-sm"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => removeMedicalHistory(index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div
                  className={`p-6 text-center ${
                    errors.history ? "text-red-400" : "text-gray-400"
                  } rounded-lg`}
                >
                  <p>No medical history added yet</p>
                </div>
              )}
            </div>

            {errors.history && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.history}
              </p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-md font-medium flex items-center justify-center ${
                submitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Form"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
