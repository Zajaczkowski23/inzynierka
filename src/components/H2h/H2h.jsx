import useFetch from "../../hooks/fetchDataHook";
import Match from "../Match/Match";

const H2h = ({ customId }) => {
  const api = `https://api.sofascore.com/api/v1/event/${customId}/h2h/events`;
  const { data } = useFetch(api);

  console.log(data);
  return (
    <div>
      <div>Last matches between teams</div>
      {data &&
        data.events
          .slice(0, 5)
          .map((matchInfo) => (
            <Match matchInfo={matchInfo} key={matchInfo.id} />
          ))}
    </div>
  );
};

export default H2h;
