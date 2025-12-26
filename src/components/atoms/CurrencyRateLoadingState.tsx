import SkeletonDiv from "./Skeleton/Skeleton";

const CurrencyRateLoadingState = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <SkeletonDiv style={{ height: 77, width: "80%" }} />
    <SkeletonDiv style={{ height: 20, width: "60%" }} />
  </div>
);

export default CurrencyRateLoadingState;
