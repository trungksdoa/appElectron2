import { Stack } from '@mui/material';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Catagory, Product } from './List';
import { CatagoryForm, LoginForm, ProductForm } from './Form';

export default function App() {
  return (
    <Router>
      <Stack direction="row" spacing={2} padding={5}>
        <Link
          style={{
            textDecoration: 'none',
            color: 'white',
            backgroundColor: 'gray',
            padding: 15,
          }}
          to="/"
        >
          Danh sách sản phẩm
        </Link>
        <Link
          style={{
            textDecoration: 'none',
            color: 'white',
            backgroundColor: 'gray',
            padding: 15,
          }}
          to="/categoryList"
        >
          Danh sách phân loại
        </Link>
        <Link
          style={{
            textDecoration: 'none',
            color: 'white',
            backgroundColor: 'gray',
            padding: 15,
          }}
          to="/ProductForm"
        >
          Thêm sản phẩm
        </Link>
        <Link
          style={{
            textDecoration: 'none',
            color: 'white',
            backgroundColor: 'gray',
            padding: 15,
          }}
          to="/CategoryForm"
        >
          Thêm danh mục
        </Link>
        <Link
          style={{
            textDecoration: 'none',
            color: 'white',
            backgroundColor: 'gray',
            padding: 15,
          }}
          to="/login"
        >
          Đăng nhập
        </Link>
      </Stack>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/categoryList" element={<Catagory />} />
        <Route path="/ProductForm" element={<ProductForm />} />
        <Route path="/CategoryForm" element={<CatagoryForm />} />
      </Routes>
    </Router>
  );
}
