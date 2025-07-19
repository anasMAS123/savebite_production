import Card from "./Card";
interface StatisticsType {
  belowMinimum: number;
  belowPar: number;
  negativeStock: number;
  positiveStock: number;
  stockInHand: string;
}
function CardList({ statistics }: { statistics: Partial<StatisticsType> }) {
  const { stockInHand, positiveStock, negativeStock, belowPar, belowMinimum } =
    statistics;
  return (
    <>
      {statistics?.stockInHand && (
        <div className={`flex flex-wrap gap-4 w-[90%] m-auto py-[30px] `}>
          <Card
            title="stockInHand"
            data={stockInHand ?? ""}
            icon="/dashboard/cashIcon.svg"
          />
          <Card
            title="positiveStock"
            data={positiveStock ?? 0}
            icon="/dashboard/positive.svg"
          />
          <Card
            title="negativeStock"
            data={negativeStock ?? 0}
            icon="/dashboard/negative.svg"
          />
          <Card
            title="belowPar"
            data={belowPar ?? 0}
            icon="/dashboard/par.svg"
          />
          <Card
            title="belowMinimum"
            data={belowMinimum ?? 0}
            icon="/dashboard/minimum.svg"
          />
        </div>
      )}
    </>
  );
}

export default CardList;
