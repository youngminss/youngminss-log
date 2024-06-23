export const parseDate = (dateString: string) => {
  // 날짜와 시간 분리
  const [datePart, period, timePart] = dateString.split(" ");

  // 날짜 부분 분리
  const [year, month, day] = datePart.split("-").map((part) => parseInt(part));

  // 시간 부분 분리
  let [hours, minutes, seconds] = timePart
    .split(":")
    .map((part) => parseInt(part));

  // 오전/오후 처리
  if (period === "오전" && hours === 12) {
    hours = 0; // 오전 12시는 0시
  } else if (period === "오후" && hours < 12) {
    hours += 12; // 오후 1시는 13시
  }

  return new Date(year, month - 1, day, hours, minutes, seconds);
};

export const timeDifference = (dateString: string) => {
  const inputDate = parseDate(dateString);
  const kstDate = new Date();

  const diffMs = kstDate.getTime() - inputDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays >= 1) {
    return `${diffDays}일 전`;
  } else {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours >= 1) {
      return `${diffHours}시간 전`;
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));

      if (diffMinutes >= 1) {
        return `${diffMinutes}분 전`;
      } else {
        return "방금 전";
      }
    }
  }
};
