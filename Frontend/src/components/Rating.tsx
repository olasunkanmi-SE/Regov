type Rate = {
  rate?: number;
};

export const Rate = ({ rate }: Rate) => {
  const rateArr = Array.from({ length: Number(rate) }, (_, i) => i + 1);
  return (
    <>
      <div>
        {rateArr.map((_, index) => (
          <span
            key={index}
            style={{
              color: "orange",
              fontWeight: "bold",
            }}
          >
            &#9733;
          </span>
        ))}
      </div>
    </>
  );
};
