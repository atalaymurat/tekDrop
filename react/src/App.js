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
          <Route path="/package/:id" element={<Package />} />
          <Route path="/liste" element={<FiyatListe />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
