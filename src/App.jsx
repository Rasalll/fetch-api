import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
      <h1 className='text-info'>Paginated Table</h1>
      {loading && <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <>
          <table className='table table-bordered w-50 ' border="1" cellPadding="5" cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Item</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <img src={item.image} width={'80px'} height={'100px'} alt="" className="img-fluid" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: "10px" }}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button className='btn' key={index} onClick={() => handlePageChange(index + 1)} style={{
                  margin: "0 5px",
                  backgroundColor: currentPage === index + 1 ? "blue" : "white",
                  color: currentPage === index + 1 ? "white" : "black",
                  
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
    </>
  )
}

export default App
