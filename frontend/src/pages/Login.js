import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { login } from "../apis/apiCall"

export default function Login () {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError("");
    
    try {
      const response = await login(values);
      // Save token to localStorage
    //   console.log(response);
      localStorage.setItem('accessToken', response?.data?.token);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.error || "Login failed!");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 text-center p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field 
                name="email" 
                type="email"
                className={`w-full p-2 border rounded ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Email"
              />
              {touched.email && errors.email && <p className="text-red-500 text-sm mt-1 text-left">{errors.email}</p>}
            </div>

            <div>
              <Field 
                name="password" 
                type="password"
                className={`w-full p-2 border rounded ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Password"
              />
              {touched.password && errors.password && <p className="text-red-500 text-sm mt-1 text-left">{errors.password}</p>}
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#FF6600] hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
              disabled={isSubmitting || loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="mt-4">
        <span>Don't have an account? </span>
        <button 
          onClick={() => navigate("/register")}
          className="text-[#FF6600] hover:text-red-800 font-medium"
        >
          Register
        </button>
      </div>
    </div>
  );
};
