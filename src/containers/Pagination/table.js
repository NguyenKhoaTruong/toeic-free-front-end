import React from "react";
import './table.scss';
const Table = props => {
    // debugger;
    const startinIndex = (props.currentPage - 1) * props.itemsPerPage;
    const lastIndex = startinIndex + props.itemsPerPage;

    const pageData = props.data.slice(startinIndex, lastIndex);
    console.log('check pagedata', pageData);

    let table_vocabulary = pageData.map((item, index) => {
        return (
            <>

                <div className="table-vocabulary">

                    {item &&
                        <table className="table table-bordered" key={index}>
                            <tbody>
                                <tr>
                                    <th className="content">{item.content}</th>
                                    <th className="content-audio">
                                        <span >
                                            <figure>
                                                <audio
                                                    controls
                                                    type="audio/mp3"
                                                    src={'http://docs.google.com/uc?export=open&id=' + `${item.audio_mp3}`}>
                                                </audio>
                                            </figure>
                                        </span></th>
                                    <th className="transcribe">{item.transcribe}</th>
                                    <th className="meaning">{item.meaning}</th>
                                    <th className="sentence">{item.sentence}</th>
                                </tr>


                            </tbody>
                        </table>}
                </div>
            </>

        );
    }
    );
    let imgcontent_vocabulary = pageData.map((item, index) => {
        return (
            <>

                <div className="data-vocabulary-from-table">
                    <div className="row">
                        <div className=" col-6 border">
                            <div className="image-vocabulary-table">
                                <img className="img-vocabulary-table" src={item.image} />
                            </div>
                        </div>
                        <div className=" col-6 border">
                            <div className="conttent-vocabulary-table">
                                <span className='content-tuvung m-3'><b>Từ Vựng:</b>{' '}{item.content}</span>
                                <span className='meaning-tuvung m-3'><b>Nghĩa:</b>{' '}{item.meaning}</span>
                                <span className='sentence-tuvung m-3'><b>Câu Áp Dụng:</b>{' '}{item.sentence}</span>
                                <span className=''>
                                    <figure>
                                        <audio
                                            controls
                                            type="audio/mp3"
                                            src={'http://docs.google.com/uc?export=open&id=' + `${item.audio_mp3}`}>
                                        </audio>
                                    </figure>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>


            </>

        );
    }
    );
    return (
        <>

            {table_vocabulary}
            <div className="text-title-learn-vocabulary-img m-3" id="learn-vocabulary-img">Học từ vựng qua hình ảnh.</div>
            {imgcontent_vocabulary}
        </>
    )
};


export default Table;
