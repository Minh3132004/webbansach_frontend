import React from "react";
import Book from "../../models/Book";
import BookProps from "./component/BookProps";

const List : React.FC = () => {
    const books : Book[] = [
        {
            id: 1,
            title: "Đắc Nhân Tâm",
            description: "Đắc Nhân Tâm là cuốn sách nổi tiếng của Dale Carnegie, tập trung vào nghệ thuật giao tiếp và xây dựng mối quan hệ. Cuốn sách cung cấp những nguyên tắc cơ bản để tạo ảnh hưởng tích cực và thuyết phục người khác.",
            originalPrice: 120000,
            price: 90000,
            imageUrl: require('./../../images/books/dacnhantam.png')
        },
        {
            id: 2,
            title: "Đam Mê Lớn",
            description: "Đam Mê Lớn của tác giả Robin Sharma là một cuốn sách truyền cảm hứng về việc theo đuổi đam mê và sống một cuộc sống ý nghĩa. Cuốn sách khuyến khích độc giả khám phá và phát triển tiềm năng cá nhân.",
            originalPrice: 150000,
            price: 110000,
            imageUrl: require('./../../images/books/damnghilon.jpg')
        },
        {
            id: 3,
            title: "Buông Bỏ Để Hạnh Phúc",
            description: "Buông Bỏ Để Hạnh Phúc của tác giả Thích Nhất Hạnh là một cuốn sách về nghệ thuật buông bỏ và tìm kiếm hạnh phúc trong cuộc sống. Cuốn sách hướng dẫn độc giả cách sống trong hiện tại và giải phóng bản thân.",
            originalPrice: 100000,
            price: 75000,
            imageUrl: require('./../../images/books/buongbodehanhphuc.jpg')
        },
        {
            id: 1,
            title: "Đắc Nhân Tâm",
            description: "Đắc Nhân Tâm là cuốn sách nổi tiếng của Dale Carnegie, tập trung vào nghệ thuật giao tiếp và xây dựng mối quan hệ. Cuốn sách cung cấp những nguyên tắc cơ bản để tạo ảnh hưởng tích cực và thuyết phục người khác.",
            originalPrice: 120000,
            price: 90000,
            imageUrl: require('./../../images/books/dacnhantam.png')
        },
        {
            id: 1,
            title: "Đắc Nhân Tâm",
            description: "Đắc Nhân Tâm là cuốn sách nổi tiếng của Dale Carnegie, tập trung vào nghệ thuật giao tiếp và xây dựng mối quan hệ. Cuốn sách cung cấp những nguyên tắc cơ bản để tạo ảnh hưởng tích cực và thuyết phục người khác.",
            originalPrice: 120000,
            price: 90000,
            imageUrl: require('./../../images/books/dacnhantam.png')
        }];

    return (
        <div className="container">
            <div className="row mt-4">
                {books.map((book) => (
                    <BookProps key = {book.id} book = {book}/>
                ))}
            </div>
        </div>
    );

}

export default List;