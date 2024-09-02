import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { FaCircleUser } from "react-icons/fa6";

const ReviewsList = ({ productId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const q = query(collection(db, 'reviews'), where('productId', '==', productId));
            const querySnapshot = await getDocs(q);
            const reviewsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    ...data,
                    createdAt: data.createdAt.toDate()
                };
            });
            setReviews(reviewsData);
        };

        fetchReviews();
    }, [productId]);

    return (
        <div className='w-10/12 m-auto'>
                 <h3 className='text-xl font-semibold mb-4'>Yorumlar</h3>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div>
                        
       
                    <div key={index} className="border-b mb-8  flex items-center border-black justify-start gap-x-4 p-4 ">
                        <FaCircleUser size={35}></FaCircleUser>
                        <div>
                     <div className='flex items-center gap-x-2'>

                     <p className='text-lg font-semibold'>{review.userName}  </p>
                        <p className='text-sm'> {review.createdAt.toLocaleString()}</p>
                     </div>
                   
                        <p>{review.comment}</p>
                        </div>
                    </div>
                    </div>
                ))
            ) : (
                <div>
                    
                </div>
            )}
        </div>
    );
};

export default ReviewsList;
