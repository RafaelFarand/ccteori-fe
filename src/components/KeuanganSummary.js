import { useEffect, useState } from "react";

const KeuanganSummary = () => {
  const [summary, setSummary] = useState({ pemasukan: 0, pengeluaran: 0, saldo: 0 });

  useEffect(() => {
    fetch("/api/keuangan/summary")
      .then(res => res.json())
      .then(setSummary);
  }, []);

  return (
    <div>
      <h3>Ringkasan Keuangan</h3>
      <ul>
        <li>Total Pemasukan: Rp{summary.pemasukan}</li>
        <li>Total Pengeluaran: Rp{summary.pengeluaran}</li>
        <li>Saldo: Rp{summary.saldo}</li>
      </ul>
    </div>
  );
};

export default KeuanganSummary;