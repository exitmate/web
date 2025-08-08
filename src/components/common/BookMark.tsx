import StarClicked from "@/assets/icons/star-clicked.svg";
import StarUnclicked from "@/assets/icons/star-unclicked.svg";
import styled from "@emotion/styled";
import Image from "next/image";


interface BookMarkProps {
  isBookmarked: boolean;
}

export const BookMark = ({isBookmarked}: BookMarkProps) => {
  return (
    <BookmarkContainer>
      {isBookmarked ? (
        <Image src={StarClicked} alt="Bookmarked" />
      ) : (
        <Image src={StarUnclicked} alt="Not Bookmarked" />
      )}
    </BookmarkContainer>
  );
}

const BookmarkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export default BookMark;