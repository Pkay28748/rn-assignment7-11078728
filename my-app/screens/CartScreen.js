import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { saveItems, loadItems } from '../components/Storage';

const CartScreen = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedItems = await loadItems();
      setCart(savedItems);
    };
    loadCart();
  }, []);

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
    saveItems(updatedCart);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item)}>
              <Image source={require('../pictures/remove.png')} style={styles.removeIcon} />
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${cart.reduce((sum, item) => sum + item.price, 0)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  price: {
    color: 'orange',
  },
  removeButton: {
    marginLeft: 'auto',
  },
  removeIcon: {
    width: 24,
    height: 24,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default CartScreen;
