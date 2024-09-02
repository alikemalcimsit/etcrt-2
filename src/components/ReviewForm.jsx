import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';

const ReviewForm = ({ productId, fetchReviews }) => {
    const [user] = useAuthState(auth);
    const [comment, setComment] = useState('');
    const [canReview, setCanReview] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const checkIfUserCanReview = async () => {
            if (user) {
                const ordersQuery = query(collection(db, 'orders'), where('userId', '==', user.uid), where('productId', '==', productId));
                const ordersSnapshot = await getDocs(ordersQuery);
                setCanReview(!ordersSnapshot.empty);

                const userQuery = query(collection(db, 'users'), where('userId', '==', user.uid));
                const userSnapshot = await getDocs(userQuery);
                if (!userSnapshot.empty) {
                    setUserName(userSnapshot.docs[0].data().name);
                }
            }
        };

        checkIfUserCanReview();
    }, [user, productId]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (canReview && comment.trim()) {
            await addDoc(collection(db, 'reviews'), {
                userId: user.uid,
                userName: userName,
                productId: productId,
                comment: comment,
                createdAt: new Date(),
            });
            setComment('');
            alert('Yorum başarıyla eklendi!');
            fetchReviews(); // Yeni yorumu getirmek için fetchReviews işlevini çağırın
        } else {
            alert('Yorum ekleme izniniz yok veya yorum metni boş.');
        }
    };

    return (
        <div className=''>
            {canReview ? (
       <div className=' w-10/12 m-auto mb-8'>
                 <form onSubmit={handleReviewSubmit}>
                    <textarea className='w-full border p-3 h-24'
                        value={comment}
                        
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Yorumunuzu yazın"
                        required
                    />
                                 <div className='flex items-center justify-end'>  <button className=" px-8 py-2 rounded-xl  bg-black text-white" type="submit">Yorumu Gönder</button>
                                 </div>
                </form>
             
       </div>
       
            ) : (
                <div className='w-10/12 border mb-20 p-4 m-auto'>
                                <h3 className='text-xl font-semibold mb-4'>Yorumlar</h3>

                                    <p className='text-lg  mb-10'>Bu ürüne yorum yapabilmek için ürünü satın almanız gerekmektedir.</p>

                </div>
            )}
        </div>
    );
};

export default ReviewForm;
