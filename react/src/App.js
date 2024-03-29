import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NoPage from "./pages/NoPage"
import Layout from "./pages/Layout"
import NewOffer from "./pages/offers/new"
import FiyatListe from "./pages/FiyatListe"
import IndexOffer from "./pages/offers/index"
import ShowOffer from "./pages/offers/show"
import EditOffer from "./pages/offers/edit"
import Package from "./pages/PackageList"
import ProductIndex from "./pages/products/Index"
import CompanyIndex from "./pages/companies/Index"
import CompanyShow from "./pages/companies/Show"
import IndexPaint from "./pages/paints/Index"
import NewPaint from "./pages/paints/New"
import EditPaint from "./pages/paints/Edit"
import PDF from "./pages/offers/pdf"
import IndexFormula from "./pages/formulas/index"
import NewFormula from "./pages/formulas/new"
import EditFormula from "./pages/formulas/edit"
import EditProduct from "./pages/products/edit"
import NewProduct from "./pages/products/new"
import NewOrder from "./pages/orders/new"
import IndexOrder from "./pages/orders/index"
import ShowOrder from "./pages/orders/show"
import EditOrder from "./pages/orders/edit"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/offer" element={<IndexOffer />} />
          <Route path="/offer/new" element={<NewOffer />} />
          <Route path="/offer/edit/:id" element={<EditOffer />} />
          <Route path="/offer/:id" element={<ShowOffer />} />
          <Route path="/offer/pdf/:id" element={<PDF />} />
          <Route path="/order" element={<IndexOrder />} />
          <Route path="/order/new" element={<NewOrder />} />
          <Route path="/order/edit/:id" element={<EditOrder />} />
          <Route path="/order/:id" element={<ShowOrder />} />
          <Route path="/package/:id" element={<Package />} />
          <Route path="/product" element={<ProductIndex />} />
          <Route path="/product/new" element={<NewProduct />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          <Route path="/liste" element={<FiyatListe />} />
          <Route path="/company" element={<CompanyIndex />} />
          <Route path="/company/:id" element={<CompanyShow />} />
          <Route path="/paints" element={<IndexPaint />} />
          <Route path="/paints/new" element={<NewPaint />} />
          <Route path="/paints/edit/:id" element={<EditPaint />} />
          <Route path="/formulas" element={<IndexFormula />} />
          <Route path="/formulas/new" element={<NewFormula />} />
          <Route path="/formulas/edit/:id" element={<EditFormula />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
