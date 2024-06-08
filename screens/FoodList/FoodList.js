import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {colors, fontSizes} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FoodItem from './FoodItem';
function FoodList(props) {
  const [foods, setFoods] = useState([
    {
      name: 'pizza',
      url: 'https://media.timeout.com/images/105544382/750/422/image.jpg',
      status: 'Opening soon',
      price: 54211.56,
      website: 'https://edition.cnn.com',
      socialNetworks: {
        facebook: 'https://www.facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagramr.com',
      },
    },
    {
      name: 'Cafe',
      url: 'https://insanelygoodrecipes.com/wp-content/uploads/2020/12/Homemade-Ground-Beef-Lasagna.png',
      status: 'Opening Now',
      price: 38223.56,
      website: 'https://edition.cnn.com',
      socialNetworks: {
        facebook: 'https://www.facebook.com',
        instagram: 'https://instagramr.com',
      },
    },
    {
      name: 'Sting',
      url: 'https://d3hne3c382ip58.cloudfront.net/files/uploads/bookmundi/resized/cmsfeatured/pasta-1509527885-785X440.jpg',
      status: 'Closing soon',
      price: 98542.32,
      website: 'https://edition.cnsaasan.com',
      socialNetworks: {
        facebook: 'https://www.facebook.com',
      },
    },
    {
      name: 'coca',
      url: 'https://restaurantclicks.com/wp-content/uploads/2022/04/Popular-Italian-Foods.jpg',
      status: 'Comming soon',
      price: 47853.21,
      website: 'https://edition.cnhyujykyn.com',
      socialNetworks: {
        instagram: 'https://instagramr.com',
      },
    },
    {
      name: 'seven up',
      url: 'https://media.cnn.com/api/v1/images/stellar/prod/210211140233-03-classic-italian-dishes.jpg?q=w_2512,h_1413,x_0,y_0,c_fill/w_1280',
      status: 'Closing soon',
      price: 47853.21,
      website: 'https://edition.cnhyujykyn.com',
      socialNetworks: {
        twitter: 'https://twitter.com',
        instagram: 'https://instagramr.com',
      },
    },
    {
      name: 'Number tow',
      url: 'https://media.timeout.com/images/105872817/image.jpg',
      status: 'Comming soon',
      price: 47853.21,
      website: 'https://edition.cnhyujykyn.com',
      socialNetworks: {
        instagram: 'https://instagramr.com',
        facebook: 'https://www.facebook.com',
      },
    },
  ]);
  const [categories, setCategories] = useState([
    {
      name: 'BBQ',
      url: 'https://cdn.tgdd.vn/2021/03/CookProduct/Bbq-la-gi-nguon-goc-va-cac-cach-tu-lam-bbq-tai-nha-vo-cung-don-gian-0-1200x676.jpg',
    },
    {
      name: 'BreakFast',
      url: 'https://img.delicious.com.au/bQjDG77i/del/2021/07/spiced-peanut-butter-and-honey-pancakes-with-blackberry-cream-155151-2.jpg',
    },
    {
      name: 'Coffee',
      url: 'https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg',
    },
    {
      name: 'Noodle',
      url: 'https://www.currytrail.in/wp-content/uploads/2022/06/Soy-Sauce-Noodles.jpg',
    },
    {
      name: 'Hot dog',
      url: 'https://www.thatlangon.com/wp-content/uploads/2021/10/hot-dog-pin-e1639404137646-large.jpg',
    },
    {
      name: 'Dinner',
      url: 'https://hips.hearstapps.com/hmg-prod/images/black-pepper-chicken1-1647622607.jpeg?resize=480:*',
    },
    {
      name: 'Beverages',
      url: 'https://thumbs.dreamstime.com/b/cans-beverages-19492376.jpg',
    },
    {
      name: 'Dessert',
      url: 'https://img.taste.com.au/xi2t8DpL/taste/2016/11/lemon-panna-cotta-with-vodka-blueberry-syrup-92005-1.jpeg',
    },
    {
      name: 'Wine',
      url: 'https://ruouvang24h.vn/wp-content/uploads/2021/06/Ruou-Vang-One-Wine-Cabernet-Sauvignon.jpg',
    },
    {
      name: 'Barbecue',
      url: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/how-to-barbecue-safely-main-image-700-350-6b4e52c.jpg?quality=90&fit=700,350',
    },
  ]);
  const [searchText, setSearchText] = useState('');
  const filteredFoods = () =>
    foods.filter(eachFood =>
      eachFood.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <AntDesign
            name="search1"
            style={{
              fontSize: 20,
              color: 'black',
              position: 'absolute',
              top: 10,
              left: 10,
            }}></AntDesign>
          <TextInput
            autoCorrect={false}
            onChangeText={text => {
              setSearchText(text);
            }}
            style={{
              backgroundColor: colors.inactive,
              height: 40,
              flex: 1,
              marginEnd: 5,
              borderRadius: 10,
              opacity: 0.8,
              paddingStart: 30,
            }}
          />
          <AntDesign
            name="menu-unfold"
            style={{
              fontSize: 30,
              color: 'black',
            }}></AntDesign>
        </View>
        <View
          style={{
            height: 100,
          }}>
          <View style={{height: 1, backgroundColor: colors.inactive}} />
          <FlatList
            horizontal={true}
            data={categories}
            keyExtractor={item => item.name}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    alert(`press ${item.name}`);
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                  }}>
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: 'cover',
                      borderRadius: 25,
                      margin: 10,
                    }}
                    source={{
                      uri: item.url,
                    }}
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: fontSizes.h6,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            style={{
              flex: 1,
            }}></FlatList>
          <View style={{height: 1, backgroundColor: colors.inactive}} />
        </View>
        {/* <ScrollView>
                    {foods.map(eachFood => <FoodItem 
                    food = {eachFood} key ={eachFood.name}/>)}                  
                </ScrollView> */}
      </View>
      {filteredFoods().length > 0 ? (
        <FlatList
          data={filteredFoods()}
          renderItem={({item}) => (
            <FoodItem
              onPress={() => {
                alert(`You press item name: ${item.name}`);
              }}
              food={item}
              key={item.name}
            />
          )}
          keyExtractor={eachFood => eachFood.name}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: fontSizes.h3,
            }}>
            No food found
          </Text>
        </View>
      )}
    </View>
  );
}
export default FoodList;
