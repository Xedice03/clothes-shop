import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import PeakyBlinders from "./PeakyBlinders";
import FollowInst from "./FollowInst";
import "./Shop.css";

type ApiProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating:{ rate: number; count: number };
};

// API-dən gələn məhsula əlavə sahələr
type Product = ApiProduct & {
  sizes: string[];
  colors: string[];
  brand: string;
  tag: string;
  oldPrice?: number;
  soldOut:boolean;
};

const allSizes = ["S", "M", "L", "XL"];

const palette = [
  "#ff6b6b", "#ff8a3d", "#ffe066", "#9be564", "#6ee7a0", "#6ecbff", "#6eeaff",
  "#6e9cff", "#7a7aff", "#9a6eff", "#c06eff", "#ff6eff", "#ff6e8a",
];

const brands = ["Minimog", "Retrolie Brook", "Learts", "Vagabond", "Abby"];
const tags = ["Fashion", "Hats", "Sandal", "Belt", "Bags", "Denim", "Sunglasses", "Beachwear"];

const priceRanges = [
  { name: "$0–$50", min: 0, max: 50 },
  { name: "$50–$100", min: 50, max: 100 },
  { name: "$100–$150", min: 100, max: 150 },
  { name: "$150–$200", min: 150, max: 200 },
  { name: "$300–$400", min: 300, max: 400 },
];

const collections = [
  { name: "All products", category: "" },
  { name: "Men's clothing", category: "men's clothing" },
  { name: "Women's clothing", category: "women's clothing" },
  { name: "Accessories", category: "jewelery" },
  { name: "Electronics", category: "electronics" },
];

// bir səhifədə neçə məhsul görünür
const perPage = 9;

// API-də rəng, ölçü, brend yoxdur
function addExtras(p: ApiProduct): Product {
  const start = p.id % 11;

  return {
    ...p,
    colors: palette.slice(start, start + (p.id % 3) + 1),
    sizes: allSizes.slice(p.id % 2),
    brand: brands[p.id % brands.length],
    tag: tags[p.id % tags.length],
    oldPrice: p.id % 4 === 0 ? Math.round(p.price * 1.25) : undefined,
    soldOut: p.rating.count < 100,
  };
}

function Shop() {
  // ---------- API ----------
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: ApiProduct[]) => {
        setProducts(data.map(addExtras));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Filtrlər 
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [priceIndex, setPriceIndex] = useState(-1);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);

  // Brands və Collections açılıb-bağlanır
  const [openBrands, setOpenBrands] = useState(true);
  const [openCollections, setOpenCollections] = useState(true);

  // eyni düyməyə ikinci dəfə basanda filtr silinir, səhifə 1-ə qayıdır
  const pickSize = (s: string) => {
    setSize(s === size ? "" : s);
    setPage(1);
  };

  const pickColor = (c: string) => {
    setColor(c === color ? "" : c);
    setPage(1);
  };

  const pickPrice = (i: number) => {
    setPriceIndex(i === priceIndex ? -1 : i);
    setPage(1);
  };

  const pickBrand = (b: string) => {
    setBrand(b === brand ? "" : b);
    setPage(1);
  };

  const pickCategory = (c: string) => {
    setCategory(c);
    setPage(1);
  };

  const pickTag = (t: string) => {
    setTag(t === tag ? "" : t);
    setPage(1);
  };

  let shown = products;

  if (size) shown = shown.filter((p) => p.sizes.includes(size));
  if (color) shown = shown.filter((p) => p.colors.includes(color));
  if (category) shown = shown.filter((p) => p.category === category);
  if (brand) shown = shown.filter((p) => p.brand === brand);
  if (tag) shown = shown.filter((p) => p.tag === tag);

  if (priceIndex >= 0) {
    const range = priceRanges[priceIndex];
    shown = shown.filter((p) => p.price >= range.min && p.price <= range.max);
  }

  // Səhifələmə 
  const totalPages = Math.max(1, Math.ceil(shown.length / perPage));
  const current = Math.min(page, totalPages);
  const pageItems = shown.slice((current - 1) * perPage, current * perPage);

  return (
    <section className="shop">
      {/* Başlıq */}
      <div className="shop-head">
        <h1>Fashion</h1>
        <div className="shop-crumbs">
          <Link to="/">Home</Link>
          <span>›</span>
          <span>Fashion</span>
        </div>
      </div>

      <div className="shop-wrap">
        {/* Sol filtrlər */}
        <aside className="shop-filters">
          <h2>Filters</h2>

          <div className="filter-group">
            <h3>Size</h3>
            <div className="filter-sizes">
              {allSizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={s === size ? "size-btn active" : "size-btn"}
                  onClick={() => pickSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Colors</h3>
            <div className="filter-colors">
              {palette.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={c}
                  className={c === color ? "color-dot active" : "color-dot"}
                  style={{ background: c }}
                  onClick={() => pickColor(c)}
                />
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Prices</h3>
            <div className="filter-list">
              {priceRanges.map((r, i) => (
                <button
                  key={r.name}
                  type="button"
                  className={i === priceIndex ? "link-btn active" : "link-btn"}
                  onClick={() => pickPrice(i)}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3 onClick={() => setOpenBrands(!openBrands)}>
              Brands {openBrands ? <BsChevronUp /> : <BsChevronDown />}
            </h3>
            {openBrands && (
              <div className="filter-inline">
                {brands.map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={b === brand ? "link-btn active" : "link-btn"}
                    onClick={() => pickBrand(b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="filter-group">
            <h3 onClick={() => setOpenCollections(!openCollections)}>
              Collections {openCollections ? <BsChevronUp /> : <BsChevronDown />}
            </h3>
            {openCollections && (
              <div className="filter-list">
                {collections.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className={c.category === category ? "link-btn active" : "link-btn"}
                    onClick={() => pickCategory(c.category)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="filter-group">
            <h3>Tags</h3>
            <div className="filter-inline">
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={t === tag ? "link-btn small active" : "link-btn small"}
                  onClick={() => pickTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Sağ: məhsullar */}
        <div className="shop-main">
          {loading && <p className="shop-msg">Loading...</p>}
          {error && <p className="shop-msg">Məlumat yüklənmədi. Yenidən cəhd edin.</p>}
          {!loading && !error && pageItems.length === 0 && (
            <p className="shop-msg">Heç nə tapılmadı. Filtrləri sıfırlayın.</p>
          )}

          <div className="shop-grid">
            {pageItems.map((p) => (
              <div className="shop-card" key={p.id}>
                {/* basanda məhsulun öz səhifəsi açılır */}
                <Link to={`/products/${p.id}`} state={{ product: p }} className="shop-link">
                  <div className="shop-img">
                    <img src={p.image} alt={p.title} />
                    {p.soldOut && <span className="shop-sold">SOLD OUT</span>}
                  </div>

                  <h6 className="shop-name">
                    {p.title.length > 22 ? p.title.slice(0, 22) + "..." : p.title}
                  </h6>
                </Link>

                <div className="shop-price">
                  ${p.price.toFixed(2)}
                  {p.oldPrice && <s>${p.oldPrice.toFixed(2)}</s>}
                </div>

                <div className="shop-colors">
                  {p.colors.map((c) => (
                    <i key={c} style={{ background: c }} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/*sehife*/}
          {totalPages > 1 && (
            <div className="shop-pages">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={i + 1 === current ? "page-btn active" : "page-btn"}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              {current < totalPages && (
                <button type="button" className="page-btn" onClick={() => setPage(current + 1)}>
                  <LiaAngleDoubleRightSolid />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <PeakyBlinders />
      <FollowInst />
    </section>
  );
}

export default Shop;