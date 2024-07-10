import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { saveItems, loadItems } from '../components/Storage';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    const loadCart = async () => {
      const savedItems = await loadItems();
      setCart(savedItems);
    };

    fetchProducts();
    loadCart();
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    saveItems(updatedCart);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>OUR STORY</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Image source={require('../pictures/add_circle.png')} style={styles.addIcon} />
            </TouchableOpacity>
            <Button title="View Details" onPress={() => navigation.navigate('ProductDetail', { product: item })} />
          </View>
        )}
      />
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
  },
  item: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
  price: {
    color: 'orange',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  addIcon: {
    width: 24,
    height: 24,
  },
});

export default HomeScreen;
