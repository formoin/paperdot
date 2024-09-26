import { useState } from 'react';
import nonBookMark from '../../assets/images/빈북마크.svg';
import fullBookMark from '../../assets/images/찬북마크.svg';
import nonBookMarkDark from '../../assets/images/다크모드빈북마크.svg';
import useTheme from '../../zustand/theme';

type BookMarkProps = {
  className?: string;
  paperId: number; //북마크 논문번호
  bookmark: boolean; //기존에 북마크되어있는지 초기값
};
const BookMark = ({ className, paperId, bookmark }: BookMarkProps) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(bookmark);
  const isDarkMode = useTheme((state) => state.isDarkMode);
  return (
    <>
      <img
        src={isBookmarked ? fullBookMark : isDarkMode ? nonBookMarkDark : nonBookMark}
        alt="북마크"
        className={`${className} cursor-pointer`}
        onClick={() => setIsBookmarked((prev) => !prev)} //(미완) 북마크 추가/제거 api 호출하는 함수로 수정할 것
      />
    </>
  );
};

export default BookMark;