<template>
  <div>
    <div class="remarks-title">
      <span>After Sale</span>
    </div>
    <div class="item-protect-container">
      <div class="item-protect-box">
        <p class="item-protect-title-box">
          <el-avatar style="background-color: #e4393c" icon="ribbon-a" />
          <span class="item-protect-title">Service</span>
        </p>
        <p class="item-protect-detail">
          High quality dare to promise: 7 days without reason to return, 30 days for free replacement, quality problems
          of the merchants bear the round-trip freight replacement; If invoice is needed, please contact the merchant
          after confirmation of receipt.(Note * Invoice is not issued with the goods)
        </p>
      </div>
      <div class="item-protect-box">
        <p class="item-protect-title-box">
          <el-avatar style="background-color: #e4393c" icon="cash" />
          <span class="item-protect-title">Commitment</span>
        </p>
        <p class="item-protect-detail">
          For goods sold and delivered by sellers on the platform, the sellers shall provide invoices and corresponding
          after-sales services. Please rest assured to buy!<br> Note: Since the manufacturer may change the product
          packaging, origin or some attachments without any prior notice, the company cannot ensure that the goods
          received by the customer are completely consistent with the pictures, origin and attachments of the mall.
          Can only ensure for the original factory goods!
          And ensure consistent with the same mainstream new products in the market at that time.
          If the mall did not update in time, please understand!
        </p>
      </div>
      <div class="item-protect-box">
        <p class="item-protect-title-box">
          <el-avatar style="background-color: #e4393c" icon="locked" />
          <span class="item-protect-title">Quality Goods</span>
        </p>
        <p class="item-protect-detail">
          ECO Mall guarantees that all the goods sold are genuine goods, and BIT self-operated goods shall be invoiced
          by machine or electronic means.
        </p>
      </div>
      <div class="item-protect-box">
        <p class="item-protect-title-box">
          <el-avatar style="background-color: #e4393c" icon="settings" />
          <span class="item-protect-title">Coinsurance</span>
        </p>
        <p class="item-protect-detail">
          With the quality assurance certificate and BIT mall invoice, you can enjoy the national co-guarantee service
          (except luxury goods and watches;
          Luxury goods and watches are guaranteed by BIT and enjoy legal three-guarantee after-sales service.) You can
          enjoy the same quality guarantee as the goods you purchase in the mall.
          BIT mall also provides competitive commodity price and freight policy, please feel assured to buy!
          <br><br>
          Note: Since the manufacturer may change the product packaging, origin or some attachments without any prior
          notice, the company cannot ensure that the goods received by the customer are completely consistent with the
          pictures, origin and attachments of the mall.
          Can only ensure for the original factory goods!
          And ensure consistent with the same mainstream new products in the market at that time.
          If the mall did not update in time, please understand!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ShowProductWarranty'
  };
</script>

<style scoped>
  .remarks-title {
    padding-left: 15px;
    height: 36px;
    font-size: 16px;
    font-weight: bolder;
    line-height: 36px;
    color: #666666;
    background-color: #F7F7F7;
  }

  .item-protect-container {
    padding: 15px;
  }

  .item-protect-box {
    margin-bottom: 30px;
  }

  .item-protect-title-box {
    display: flex;
    align-items: center;
  }

  .item-protect-title {
    padding-left: 15px;
    font-size: 20px;
    font-weight: bolder;
    color: #e4393c;
  }

  .item-protect-detail {
    padding-top: 5px;
    padding-left: 46px;
    font-size: 14px;
    color: #999;
  }
</style>
