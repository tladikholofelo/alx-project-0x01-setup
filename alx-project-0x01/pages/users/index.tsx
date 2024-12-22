import { UserData } from "@/interfaces";
import React, { useState } from "react";
import UserModal from "@/components/common/UserModal";
import Header from "@/components/layout/Header";

interface UsersProps {
  users: UserData[];
}

const Users: React.FC<UsersProps> = ({ users }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<UserData | null>(null);

  const handleAddUser = (user: UserData) => {
    setNewUser(user);
    setModalOpen(false); // Close the modal after adding the user
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">User Content</h1>
          <button onClick={() => setModalOpen(true)} className="bg-blue-700 px-4 py-2 rounded-full text-white">
            Add User
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {users.map((user, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-lg">
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm">{user.email}</p>
            </div>
          ))}
        </div>
      </main>

      {isModalOpen && (
        <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddUser} />
      )}
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
}

export default Users;
