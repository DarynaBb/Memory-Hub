import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserStudySetsContext } from "../context/UserStudySetsContext";

function UserStatistic() {
  const { getUserInfo, user } = useContext(AuthContext);
  const { countCardsByStatus } = useContext(UserStudySetsContext);

  useEffect(() => {
    getUserInfo();
  }, []);

  const numberOfStudySets = user?.savedStudySets?.length ?? 0;

  const cardsCount = countCardsByStatus(user?.savedStudySets);

  const totalCards =
    cardsCount.mastered + cardsCount.needPractice + cardsCount.notStudied;

  return (
    <section>
      <h2 className="mt-[10px] dm-sans-medium text-[2em]">
        Number of study sets: {numberOfStudySets}{" "}
      </h2>
      <div className="mt-[40px] flex items-center">
        <p className="dm-sans-regular text-[1.4em]">Mastered </p>
        <progress
          aria-label="loading"
          id="p02g"
          max={totalCards}
          value={cardsCount.mastered}
          className="mr-[10px] ml-[10px] h-[10px] w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-lime-500 [&::-moz-progress-bar]:bg-cyan-500"
        ></progress>
        <p className="dm-sans-medium text-[1.4em]"> {cardsCount.mastered}</p>
        <p className="ml-[10px] dm-sans-medium text-[1.4em]">Cards</p>
      </div>
      <div className="mt-[40px] flex items-center">
        <p className="flex-none dm-sans-regular text-[1.4em]">Need practice</p>
        <progress
          aria-label="loading"
          id="p02g"
          max={totalCards}
          value={cardsCount.needPractice}
          className="mr-[10px] ml-[10px] h-[10px] w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-500 [&::-moz-progress-bar]:bg-cyan-500"
        ></progress>
        <p className="dm-sans-medium text-[1.4em]"> {cardsCount.needPractice}</p>
        <p className="ml-[10px] dm-sans-medium text-[1.4em]">Cards</p>
      </div>
      <div className="mt-[40px] flex items-center mb-[10px]">
        <p className="flex-none dm-sans-regular text-[1.4em]">Not studied</p>
        <progress
          aria-label="loading"
          id="p02g"
          max={totalCards}
          value={cardsCount.notStudied}
          className="mr-[10px] ml-[10px] h-[10px] w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-red-500 [&::-moz-progress-bar]:bg-cyan-500"
        ></progress>
        <p className="dm-sans-medium text-[1.4em]"> {cardsCount.notStudied}</p>
        <p className="ml-[10px] dm-sans-medium text-[1.4em]">Cards</p>
      </div>
    </section>
  );
}

export default UserStatistic;
