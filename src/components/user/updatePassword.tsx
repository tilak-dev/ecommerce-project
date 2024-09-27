"use client";

export default function UpdatePassword() {
  return (
    <div className="flex justify-center items-center h-auto ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Update Password
        </h2>
        <form>
          {/* Old Password */}
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your old password"
              required
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your new password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
