import { useEffect, useState } from "react";
import { BASE_URL } from "../utils";

const KeuanganRiwayat = ({ jenis, title }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/keuangan`)
      .then(res => res.json())
      .then(data => {
        setList(data.filter(item => item.jenis === jenis));
      });
  }, [jenis]);

  return (
    <div className="riwayat-container">
      <h3>{title}</h3>
      {list.length === 0 ? (
        <div className="empty-riwayat">Belum ada data.</div>
      ) : (
        <table className="riwayat-table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Jumlah</th>
              <th>Kategori</th>
              <th>Keterangan</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item.id}>
                <td>{item.tanggal}</td>
                <td>Rp{Number(item.jumlah).toLocaleString()}</td>
                <td>{item.kategori}</td>
                <td>{item.keterangan}</td>
                <td>{item.user_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default KeuanganRiwayat;