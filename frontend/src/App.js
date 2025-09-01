import { useEffect, useState } from 'react';
import { Table, Typography, Spin } from '@arco-design/web-react';
import axios from 'axios';

const API_URL = "http://localhost:8000"

const { Title } = Typography;

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/datasets")
      .then(res => {
        console.log("response", res.data.data)
        setData(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("API fetch error:", err);
        setLoading(false);
      });
  }, []);

  const columnDefs = [
    { title: 'Column Name', dataIndex: 'name' },
    { title: 'Description', dataIndex: 'description' },
    { title: 'Published', dataIndex: 'is_published' },
    { title: 'Time', dataIndex: 'latest_available_time_utc' }
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title heading={3}>⚡ Virtual Energy Trading App</Title>
      {loading ? (
        <Spin tip="Loading market data..." />
      ) : (
        data.length > 0 && <Table columns={columnDefs} data={data} pagination={true} />
      )}
    </div>
  );
}

export default App;
