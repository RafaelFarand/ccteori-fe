// components/Keuangan.js
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils";

const Keuangan = () => {
  const [list, setList] = useState([]);
  const [summary, setSummary] = useState({ pemasukan: 0, pengeluaran: 0, saldo: 0 });

  useEffect(() => {
    fetch(`${BASE_URL}/api/keuangan`)
      .then(res => res.json())
      .then(setList);
  }, []);

  useEffect(() => {
    fetch("/api/keuangan/summary")
      .then(res => res.json())
      .then(setSummary);
  }, []);

  return (
    <div>
      <h2>Data Keuangan</h2>
      <ul>
        {list.map(item => (
          <li key={item.id}>
            {item.tanggal} - {item.jenis} - Rp{item.jumlah} - {item.keterangan}
          </li>
        ))}
      </ul>
      <h3>Ringkasan Keuangan</h3>
      <ul>
        <li>Total Pemasukan: Rp{summary.pemasukan}</li>
        <li>Total Pengeluaran: Rp{summary.pengeluaran}</li>
        <li>Saldo: Rp{summary.saldo}</li>
      </ul>
    </div>
  );
};

export default Keuangan;
