import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import GirdItem from './GirdItem';
function ProductGirdView(props) {
  const [products, setProducts] = useState([
    {
      productName: 'Samsung SC 5573',
      url: 'https://s3.cloud.cmctelecom.vn/tinhte1/2013/01/3264232_8331898923_719c9e1aef_b.jpg',
      price: 75,
      specifications: [
        'Dry clean',
        'cyclone filter',
        'conveniece cord storage',
      ],
      reviews: 19,
      start: 5,
    },
    {
      productName: 'Máy Hút Bụi Samsung VC18M3110VB/SV 1800W',
      url: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//Apro/Apro_product_25529/may-hut-bui-vc1_main_197_1020.png.webp',
      price: 88,
      specifications: [
        'Slimz design',
        'Easy to maneuver',
        'Stands upright for storage',
      ],
      reviews: 120,
      start: 4,
    },
    {
      productName: 'BISSELL 2252 CleanView Swivel',
      url: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/71pzkmU3PuL._AC_SL1500_.jpg',
      price: 120,
      specifications: ['Suction power', 'Easy to assemble', 'Suction power'],
      reviews: 221,
      start: 2,
    },
    {
      productName: 'Hoover WindTunnel Whole House',
      url: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51fqTq+n-iS._AC_SL1000_.jpg',
      price: 632,
      specifications: [
        'For hardwood floors',
        'Maneuverability',
        'Light weight',
      ],
      reviews: 844,
      start: 3,
    },
    {
      productName: 'eureka WhirlWind Bagless Canister',
      url: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/81+dXJp404L._AC_SL1500_.jpg',
      price: 565,
      specifications: ['Versatility', 'Suction power', 'For hardwood floors'],
      reviews: 482,
      start: 4,
    },
    {
      productName: 'Shark NV360 Navigator Lift-Away',
      url: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/71FohJtmeNL._AC_SL1500_.jpg',
      price: 694,
      specifications: ['Easy to assemble', 'Versatility', 'Durability'],
      reviews: 923,
      start: 2,
    },
  ]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <FlatList
        style={{marginTop: 5}}
        data={products}
        numColumns={2}
        keyExtractor={item => item.productName}
        renderItem={({item, index}) => (
          <GirdItem
            item={item}
            index={index}
            onPress={() => {
              let clonedProducts = products.map(eachProduct => {
                if (item.productName == eachProduct.productName) {
                  return {
                    ...eachProduct,
                    isSaved:
                      eachProduct.isSaved == false ||
                      eachProduct.isSaved == undefined
                        ? true
                        : false,
                  };
                }
                return eachProduct;
              });
              setProducts(clonedProducts);
            }}
          />
        )}
      />
    </View>
  );
}
export default ProductGirdView;
