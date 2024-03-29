import React from "react"
import { Link, useLocation } from "react-router-dom"

const NavMenu = () => {
  const location = useLocation()

  console.log(location.pathname)
  const shouldShowCompanyLink = location.pathname !== "/company"
  const shouldShowProductLink = location.pathname !== "/product"
  const shouldShowOfferLink = location.pathname !== "/offer"
  const shouldShowListeLink = location.pathname !== "/liste"
  const shouldShowHomeLink = location.pathname !== "/"
  const shouldShowPaintsLink = location.pathname !== "/paints"
  const shouldShowFormulaLink = location.pathname !== "/formulas"
  const shouldShowOrderLink = location.pathname !== "/order"

  return (
    <React.Fragment>
        <div className="px-4 bg-slate-50 py-2 flex items-center">
          {shouldShowHomeLink && (
            <Link to="/">
              <button className="btn-purple">Home</button>
            </Link>
          )}
          {shouldShowOfferLink && (
            <Link to="/offer">
              <button className="btn-purple">Sipariş Liste</button>
            </Link>
          )}
          {shouldShowListeLink && (
            <Link to="/liste">
              <button className="btn-purple">Fiyat Liste</button>
            </Link>
          )}
          {shouldShowProductLink && (
            <Link to="/product">
              <button className="btn-purple">Ürünler</button>
            </Link>
          )}
          {shouldShowCompanyLink && (
            <Link to="/company">
              <button className="btn-purple">Firmalar</button>
            </Link>
          )}
          {shouldShowPaintsLink && (
            <Link to="/paints">
              <button className="btn-purple">Malzeme</button>
            </Link>
          )}
          {shouldShowFormulaLink && (
            <Link to="/formulas">
              <button className="btn-purple">Reçete</button>
            </Link>
          )}
          {shouldShowOrderLink && (
            <Link to="/order">
              <button className="btn-purple">Sipariş</button>
            </Link>
          )}
        </div>
    </React.Fragment>
  )
}

export default NavMenu
