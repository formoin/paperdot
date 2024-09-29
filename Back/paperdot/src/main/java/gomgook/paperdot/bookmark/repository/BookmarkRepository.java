package gomgook.paperdot.bookmark.repository;

import gomgook.paperdot.bookmark.entity.Bookmark;
import gomgook.paperdot.bookmark.entity.BookmarkPaperIdProjection;
import gomgook.paperdot.member.entity.Member;
import gomgook.paperdot.paper.entity.Paper;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Optional<List<Bookmark>> findAllByMemberId(Long memberId);

    Optional<Bookmark> findAllByMemberAndPaper(Member member, Paper paper);

    void deleteAllByMemberAndPaper(Member member, Paper paper);

    void deleteAllByMemberId(Long memberId);

    List<BookmarkPaperIdProjection> findAllPaperIdByMemberId(Long memberId);
}
