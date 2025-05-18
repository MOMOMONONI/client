import React, { useState, useEffect } from "react";
import { getListAllUsers, changeUserStatus, changeUserRole } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then(() => {
        handleGetUsers(token);
        toast.success("อัปเดตสถานะเรียบร้อยแล้ว!");
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then(() => {
        handleGetUsers(token);
        toast.success("อัปเดตสิทธิ์เรียบร้อยแล้ว!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto p-6 bg-[#F4EFE6] shadow-lg rounded-xl border border-[#BFA78A]">
      <h2 className="text-2xl font-bold mb-4 text-[#5D3A00]">📋 รายชื่อผู้ใช้งาน</h2>

      <table className="w-full border-collapse text-sm">
        <thead className="bg-[#BFA78A] text-white">
          <tr>
            <th className="p-3 border">ลำดับ</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">สิทธิ์</th>
            <th className="p-3 border">สถานะ</th>
            <th className="p-3 border">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((el, i) => (
            <tr key={el.id} className="hover:bg-[#E9E2D0]">
              <td className="p-2 border text-center text-[#5D3A00]">{i + 1}</td>
              <td className="p-2 border text-[#4B3621]">{el.email}</td>
              <td className="p-2 border">
                <select
                  onChange={(e) => handleChangeUserRole(el.id, e.target.value)}
                  value={el.role}
                  className="border px-2 py-1 rounded-md bg-white text-[#4B3621]"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td className="p-2 border text-center">
                <span
                  className={`font-semibold ${
                    el.enabled ? "text-[#556B2F]" : "text-red-500"
                  }`}
                >
                  {el.enabled ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="p-2 border text-center">
                <button
                  className={`px-3 py-1 rounded-md text-white shadow-md transition-all duration-200 ${
                    el.enabled
                      ? "bg-[#B5651D] hover:bg-[#8B4513]"
                      : "bg-[#556B2F] hover:bg-[#6B8E23]"
                  }`}
                  onClick={() => handleChangeUserStatus(el.id, el.enabled)}
                >
                  {el.enabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                ไม่มีข้อมูลผู้ใช้งาน
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
