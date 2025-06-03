// components/KeuanganForm.js
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const KeuanganForm = ({ jenis }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ tanggal: "", jumlah: "", keterangan: "", kategori: "iuran" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = form.kategori === "iuran" ? "setoran" : "pengeluaran";
    const user_id = localStorage.getItem("user_id");
    try {
      const response = await fetch(`${BASE_URL}/keuangan/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, user_id }),
      });

      if (response.ok) {
        alert("Data berhasil disimpan");
        navigate("/");
      } else {
        const err = await response.json();
        alert("Gagal menyimpan data: " + err.message);
      }
    } catch (error) {
      alert("Gagal menyimpan data");
    }
  };

  const userRole = localStorage.getItem("role");

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Kategori</label>
        <select
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          disabled={userRole === "anggota"}
        >
          <option value="iuran">Iuran</option>
          {userRole === "bendahara" && <option value="operasional">Operasional</option>}
        </select>
      </div>
      <div className="form-group">
        <label>Tanggal</label>
        <input name="tanggal" type="date" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Jumlah</label>
        <input name="jumlah" type="number" placeholder="Jumlah" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Keterangan</label>
        <textarea name="keterangan" placeholder="Keterangan" onChange={handleChange}></textarea>
      </div>
      <button type="submit">Simpan</button>
    </form>
  );
};

export default KeuanganForm;
