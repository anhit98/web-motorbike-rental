import styled from 'styled-components';

const HomeWrapper = styled.div`
  .space {
    margin-bottom: 20px;
    padding-top: 0px;
    padding-bottom: 10px;
    background-color: #f1f3f6;
    padding-left: 0px;
    padding-right: 0px;
    border: 1px solid #f1f3f6;
  }
  .card {
    border-radius: 6px;
    width: 22.833333%;
    box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
    background-color: #ffffff;
    color: #252422;
    position: relative;
    z-index: 1;
    color: white;
  }
  .card .content {
    padding: 15px 15px 10px 15px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: 'Muli', Arial, sans-serif;
   
   
  }
  
  .row {
    height: 63px;
    margin-right: -15px;
    margin-left: -15px;
    box-sizing: border-box;
  }
  .col-5 {
    position: relative;
    min-height: 1px;
    width: 10.666667%;
    padding-right: 15px;
    padding-left: 15px;
  }
  
  .card .icon-big {
    font-size: 3em;
    min-height: 64px;
  }
  .icon-warning {
    color: #f3bb45;
  }
  .text-center {
    text-align: center;
  }
  .col-7 {
    position: relative;
    min-height: 1px;
    width: 86.333333%;
    padding-right: 15px;
    padding-left: 15px;
  }
  .card .numbers {
    font-size: 2em;
    text-align: right;
  }
  .card .numbers p {
    margin: 0;
  }
  p {
    font-size: 16px;
    line-height: 1.4em;
  }
  .row:before {
    display: table;
    content: ' ';
  }
  .card .footer {
    padding: 0;
    line-height: 30px;
    background-attachment: fixed;
    position: relative;
  }
  .card .footer hr {
    margin-top: 5px;
    margin-bottom: 5px;
    border-color: #f1eae0;
    visibility: visible !important;
    border: 0;
    border-top: 1px solid #eee;
  }
  .card .stats .link {
    color: #a9a9a9;
    font-weight: 300;
  }

  fa {
    font-size: 48px;
    color: red;
  }
  .double-table {
    width: 39.35%;
  }
  .renter p {
    font-size: 12px;
  }
  .isoLayoutContent .title {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .red {
    background-color: #ff0000ab;
  }
  .yellow {
    background-color: #fbff00;
  }
  .green {
    background-color: #2eeb4e;
  }
`;

export default HomeWrapper;
